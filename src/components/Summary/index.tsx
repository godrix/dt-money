import incomeSvg from '../../assets/income.svg'
import totalSvg from '../../assets/total.svg'
import outcomeSvg from '../../assets/outcome.svg'
import { Container } from "./styles";
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils/format';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    }
    else {
      acc.withDraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposit: 0,
    withDraw: 0,
    total: 0
  })
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeSvg} alt="Entradas" />
        </header>
        <strong>
         {formatCurrency(summary.deposit)}
      </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeSvg} alt="Saídas" />
        </header>
        <strong>
         {formatCurrency(summary.withDraw)}
      </strong>
      </div>

      <div className="hightlight-backgroung">
        <header>
          <p>Total</p>
          <img src={totalSvg} alt="Total" />
        </header>
        <strong>
         {formatCurrency(summary.total)}
      </strong>
      </div>
    </Container>)
}