package main

import (
	"encoding/json"
	"fmt"
	"sync"

	"github.com/Kayke-Fujinaka/Home-Broker/stock-system/internal/infra/kafka"
	"github.com/Kayke-Fujinaka/Home-Broker/stock-system/internal/market/dto"
	"github.com/Kayke-Fujinaka/Home-Broker/stock-system/internal/market/entity"
	"github.com/Kayke-Fujinaka/Home-Broker/stock-system/internal/transformer"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	ordersIn := make(chan *entity.Order)
	ordersOut := make(chan *entity.Order)
	wg := &sync.WaitGroup{}
	defer wg.Wait()

	kafkaMsgChan := make(chan *ckafka.Message)
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9094",
		"group.id":          "myGroup",
		"auto.offset.reset": "earliest",
	}
	producer := kafka.NewKafkaProducer(configMap)
	kafka := kafka.NewConsumer(configMap, []string{"input"})

	go kafka.Consume(kafkaMsgChan)

	book := entity.NewBook(ordersIn, ordersOut, wg)
	go book.Trade()

	go func() {
		for msg := range kafkaMsgChan {
			wg.Add(1)
			tradeInput := dto.TradeInput{}
			err := json.Unmarshal(msg.Value, &tradeInput)
			if err != nil {
				panic(err)
			}
			order := transformer.TransformInput(tradeInput)
			ordersIn <- order
		}

		for res := range ordersOut {
			output := transformer.TransformerOutput(res)
			outputJson, err := json.MarshalIndent(output, "", " ")
			if err != nil {
				fmt.Println(err)
			}
			producer.Publish(outputJson, []byte("orders"), "output")
		}
	}()
}
