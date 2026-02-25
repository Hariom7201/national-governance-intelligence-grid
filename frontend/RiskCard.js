export default function RiskCard({district,risk}) {
  return (
    <div>
      <h2>{district}</h2>
      <p>Risk Score: {risk}</p>
    </div>
  )
}