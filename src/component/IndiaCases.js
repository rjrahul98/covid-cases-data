import './IndiaCases.css'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import StateCases from './StateCases'
  
function IndiaCases() {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [activeCases, setActiveCases] = useState('');
    const [discharged, setDischarged] = useState('');
    const [deceased, setDeceased] = useState('');

    const fetchData = () => {
        fetch('https://www.mohfw.gov.in/data/datanew.json').then(res=>res.json())
        .then((data)=>{
            data.map((row)=>{
              row.new_active = parseInt(row.new_active);
              row.active = parseInt(row.active);
              row.cured = parseInt(row.cured);
              row.new_cured = parseInt(row.new_cured);
              row.death = parseInt(row.death);
              row.new_death = parseInt(row.new_death);
            });
            setData(data);
            console.log(data);
            setActiveCases(data[36].new_active);
            setDischarged(data[36].new_cured);
            setDeceased(data[36].new_death);
        });
    }
    useEffect(()=>{
        fetchData();
    },[])

    return (
      <>
      <div className="boxContainer">
        {data && 
        <><div className='active'>
            <h2>Active <span>({(parseFloat(activeCases)*100/(parseFloat(activeCases)+parseFloat(discharged)+parseFloat(deceased))).toFixed(2)}%)</span></h2>
            {activeCases && 
                <h1>{activeCases} <span style={{color: parseFloat(activeCases) > parseFloat(data[36].active) ? 'red' : 'rgba(6, 255, 0, 1)'}}>({Math.abs(parseFloat(activeCases) - parseFloat(data[36].active))} <FontAwesomeIcon icon={parseFloat(activeCases) - parseFloat(data[36].active) > 0 ? faArrowUp : faArrowDown} size="xs"/>)</span></h1>
            }
        </div>
        <div className='discharged'>
            <h2>Discharged <span>({(parseFloat(discharged)*100/(parseFloat(activeCases)+parseFloat(discharged)+parseFloat(deceased))).toFixed(2)}%)</span></h2>
            {discharged && 
                <h1>{discharged} <span style={{color: parseFloat(discharged) > parseFloat(data[36].cured) ? 'rgba(6, 255, 0, 1)' : 'red'}}>({Math.abs(parseFloat(discharged) - parseFloat(data[36].cured))} <FontAwesomeIcon icon={parseFloat(discharged) - parseFloat(data[36].cured) > 0 ? faArrowUp : faArrowDown} size="xs"/>)</span></h1>
            }
        </div>
        <div className='deceased'>
            <div>
            </div>
            <h2>Deceased <span>({(parseFloat(deceased)*100/(parseFloat(activeCases)+parseFloat(discharged)+parseFloat(deceased))).toFixed(2)}%)</span></h2>
            {deceased && 
                <h1>{deceased} <span style={{color: parseFloat(deceased) > parseFloat(data[36].death) ? 'red' : 'rgba(6, 255, 0, 1)'}}>({Math.abs(parseFloat(deceased) - parseFloat(data[36].death))} <FontAwesomeIcon icon={parseFloat(deceased) - parseFloat(data[36].death) > 0 ? faArrowUp : faArrowDown} size="xs"/>)</span></h1>
            }
        </div></>
        }
      </div>
      <div className='stateData'>
        <StateCases data={data}/>
      </div>
      </>
    );
  }
  
export default IndiaCases;