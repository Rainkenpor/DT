
const menuItems = [
  {
    name: "Inicio",
    href: "/app",
  },
  {
    name: "Cursos",
    href: "/app/courses",
  },
  {
    name: "Alumnos",
    href: "/app/students",
  },
];


export default function Menu() {
  return (
    <div className="p-2 w-52 h-full box-border">
      <nav>
        <ul className="">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a href={item.href}>
                <span className="text-xl font-bold">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

  )
}