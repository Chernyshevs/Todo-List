export default function IconButton({ color, children, ...props }) {
  return (
    <button className={`btn-card ${color}`} {...props}><img src={children} alt="button icon" /></button>
  )
}