import { Container } from "./styles";

export function TransactionTable() {
  return (<Container>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Data</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>MacBook</td>
          <td className="withDraw">- 5,000.00</td>
          <td>Tech</td>
          <td>12/12/2069</td>
        </tr>
        <tr>
          <td>Café</td>
          <td className="deposit">5,00</td>
          <td>Alimentação</td>
          <td>12/12/2069</td>
        </tr>
      </tbody>
    </table>
  </Container>)
}