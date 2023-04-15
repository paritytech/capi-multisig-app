function setTheme(themeName: string) {
  localStorage.setItem("data-theme", themeName);
  document.documentElement.setAttribute("data-theme", themeName);
}

(function () {
  if (localStorage.getItem("data-theme") === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
  console.log(localStorage.getItem("data-theme"))
})();
export default function ThemeSwitchToggle() {
  const toggleOn = () => {
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return <button className='bg-fill-secondary px-4 py-2 text-foreground-matchBackground rounded-full text-body_2 font-medium' onClick={toggleOn} >Change theme</button>
}
