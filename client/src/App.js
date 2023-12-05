import './App.css'
import PackingList from './components/PackingList';

function App() {
  return (
    <div className='mx-auto container flex flex-col mt-12'>
      <h2 className="text-3xl font-bold text-center text-travelGray">
        Travellers <span className='text-travelGreen mt-2'>App</span>
      </h2>
    
      <PackingList />
    </div>
  );
}

export default App;
