export async function OrderForm() {
  return (
    <div>
      <h1>Order Form</h1>
      <form>
        <input type="number" min={1} step={1} placeholder="quantidade" />
        <br />
        <input type="number" min={1} step={0.1} placeholder="preco" />
        <br />
        <button>Comprar</button>
      </form>
    </div>
  )
}