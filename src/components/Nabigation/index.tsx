// ______________________________________________________
// ナビゲーション
import React from "react"
import Style from "./style"
import { useHistory, useLocation } from "react-router"
import Method from "components/method"
import Cats from "images/cats.png"
import { Element } from "react-scroll"
import EventListener from "react-event-listener"
// ______________________________________________________
// 型定義
type Route = "raim" | "cham"

interface Props {
  type?: Route
}

// ______________________________________________________
// コンポーネント
const Component: React.FC<Props> = (props) => {
  const { children } = props
  const ref = React.useRef<HTMLDivElement | null>(null)
  const history = useHistory() //履歴
  const [transition, setTransition] = React.useState<undefined | Route>(undefined) // 画面の種類
  const [methodButton, setMethodButton] = React.useState(true)  // メソッドを表示するか？
  const location = useLocation() // URL
  const [width, setWidth] = React.useState(1000);
  //画面遷移のアニメーション
  const screenTransition = (path: Route) => () => {
    setTransition(path === transition ? undefined : path)
    history.push(path === transition ? "/" : path)
    setMethodButton(path === transition)
    setTimeout(() => {
      window.scrollTo(0, ref!.current!.offsetTop)
    }, 1)
  }
  const initFetch = () => {
    setWidth(window.innerWidth)
  }
  //画面ロード時
  React.useEffect(() => {
    initFetch()
    switch (location.pathname) {
      case "/":
        break;
      case "/raim":
        setTransition("raim")
        setMethodButton(false)
        break;
      case "/cham":
        setTransition("cham")
        setMethodButton(false)
        break;
    }
  }, [location])


  const handleResize = () => {
    setWidth(window.innerWidth)
  }
  return (
    <Element name="nav">
      <EventListener target="window" onResize={handleResize} />
      <Style ref={ref} transition={transition} type={width > 600 ? "normal" : "mini"} >
        <div className="_left">{children}</div>
        <div onClick={screenTransition("raim")} className="left"><div><img src={Cats} alt="" /><h1>RAIM</h1></div></div>
        <div onClick={screenTransition("cham")} className="right"><div><img src={Cats} alt="" /><h1>CHAM</h1></div></div>
        <div className="_right">{children}</div>
        <Method isOpen={methodButton} onChange={setMethodButton} />
      </Style>
    </Element>
  )
}
export default Component