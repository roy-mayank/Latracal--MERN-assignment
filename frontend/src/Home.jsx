import { Button, Flex } from 'antd';
import { Link } from 'react-router';

function Home() {

  return (
    <div className="px-32 py-12 flex justify-between flex-col items-center min-w-screen gap-20">
      <div className='items-center text-center'><p className="text-3xl font-bold flex text-center">Welcome to the ReviewTown</p>
        <p className="align-top"> Your Go-To book exploration and review hub</p></div>
      <Flex gap="small" wrap>
        <Link to="/books">
          <Button type="primary" size='large'>Look at Books</Button>
        </Link>
      </Flex>
    </div>
  )
}

export default Home
