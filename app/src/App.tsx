import ActionsMenu from "./pages/ActionsMenu/ActionsMenu";
import MainPage from "./pages/MainPage/MainPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <MainPage />
      <ActionsMenu />
    </div>
  )
}
