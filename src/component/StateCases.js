import './StateCases.css';
import {Table, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
  
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
};
  
function StateCases(props){
    const { items, requestSort, sortConfig } = useSortableData(props.data);
    const [showStateData, setShowStateData] = useState(false);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleClick = () =>{
        setShowStateData(!showStateData);
    }
    return (
        <div>
            <Button
                className='showStateDataBtn'
                color="success"
                outline
                onClick={()=>handleClick()}
            >
               { showStateData ? 'Hide Table Data' : 'Show State Wise Data'}
            </Button>
            {showStateData && 
                <>
                <p style={{display: 'flex', justifyContent: 'flex-start'}}>You can sort the data by clicking on Total and State Name Columns*</p>
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th colSpan={2}></th>
                            <th colSpan={2}>Active Cases</th>
                            <th colSpan={2}>Cured/Discharged</th>
                            <th colSpan={2}>Deaths</th>
                        </tr>
                        <tr>
                            <th>S.No.</th>
                            <th id='State' className={getClassNamesFor('state_name')} onClick={() => requestSort('state_name')}>State/UT</th>
                            <th className={getClassNamesFor('new_active')} onClick={() => requestSort('new_active')}>Total</th>
                            <th>Change Since Yeasterday</th>
                            <th className={getClassNamesFor('new_cured')} onClick={() => requestSort('new_cured')}>Total</th>
                            <th>Change Since Yeasterday</th>
                            <th className={getClassNamesFor('new_death')} onClick={() => requestSort('new_death')}>Total</th>
                            <th>Change Since Yeasterday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((rowData,id)=>(
                            <tr key={id}>
                                <td>{rowData.sno}</td>
                                <td>{rowData.state_name ? rowData.state_name : 'Total'}</td>
                                <td>{rowData.new_active}</td>
                                {parseInt(rowData.new_active) !== parseInt(rowData.active) ?
                                <td style={{color: parseInt(rowData.new_active) > parseInt(rowData.active) ? 'red' : 'rgba(6, 255, 0, 1)'}}>
                                    {Math.abs(parseInt(rowData.new_active) - parseInt(rowData.active))} (<FontAwesomeIcon icon={parseInt(rowData.new_active) > parseInt(rowData.active) ? faArrowUp : faArrowDown} size="xs"/>)
                                </td> : <td>-</td>
                                }
                                <td>{rowData.new_cured}</td>
                                {parseInt(rowData.new_cured) !== parseInt(rowData.cured) ?
                                <td style={{color: parseInt(rowData.new_cured) > parseInt(rowData.cured) ? 'rgba(6, 255, 0, 1)' : 'red'}}>
                                    {Math.abs(parseInt(rowData.new_cured) - parseInt(rowData.cured))} (<FontAwesomeIcon icon={parseInt(rowData.new_cured) > parseInt(rowData.cured) ? faArrowUp : faArrowDown} size="xs"/>)
                                </td> : <td>-</td>
                                }
                                <td>{rowData.new_death}</td>
                                {parseInt(rowData.new_death) !== parseInt(rowData.death) ?
                                <td style={{color: parseInt(rowData.new_death) > parseInt(rowData.death) ? 'red' : 'rgba(6, 255, 0, 1)'}}>
                                    {Math.abs(parseInt(rowData.new_death) - parseInt(rowData.death))} (<FontAwesomeIcon icon={parseInt(rowData.new_death) > parseInt(rowData.death) ? faArrowUp : faArrowDown} size="xs"/>)
                                </td> : <td>-</td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            }
        </div>
    )
}

export default StateCases;