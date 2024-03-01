import { observer } from "mobx-react-lite";
import Header from "../../components/header"
import Table from "../../components/table"

const MainPage: React.FC = observer(() => {

    return (
        <>
            <Header />
            <Table />
        </>
    )
})

export default MainPage