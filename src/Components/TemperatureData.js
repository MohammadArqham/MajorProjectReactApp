import React,{useEffect,useState} from 'react'

const TemperatureData = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch('https://api.thingspeak.com/channels/2508686/feeds.json?api_key=A6GVM0B7PRTTPEUM&results=2');
                const data = await response.json();
                console.log(data.feeds)
                setData(data.feeds)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])
    return (
    <>
    <div style={{display:"flex",justifyContent:"center",fontFamily:"sans-serif"}}>
        <table border={1}>
            <tr>
                <th>created_at</th>
                <th>entry Id</th>
                <th>Temperature</th>
                <th>Humidity</th>
            </tr>
            {data.map((value,index)=>(
            <tr key={index}>
                <td>{value.created_at}</td>
                <td>{value.entry_id}</td>
                <td>{value.field1}</td>
                <td>{value.field2}</td>
            </tr>
            ))}
            
        </table>
        </div>
    </>
  )
}

export default TemperatureData