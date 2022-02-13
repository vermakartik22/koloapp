import {Row, Col, Input, Skeleton } from "antd";
import { getMarvelCharactars } from '../services';
import {useState,useEffect} from 'react';

const FetchHeros = function(){
    const [heros,setHeros] = useState([]);
    const [fullArr,setFullArr] = useState([]);
    
    useEffect(()=>{
        getMarvelCharactars().then((response) => {
            if (response && response.status === 200) {
                console.log(response.data.data.results);
                setHeros(response && response.data.data.results);
                setFullArr(response && response.data.data.results);
            }
        })
    },[]);

    const searchHero = (value) =>{
        console.log(value.target.value);
        let val = value.target.value;
        // let pos = heros.filter(h => h.name === val);
        // console.log(pos);
        
        const regex = new RegExp(val);
        //const check = new Promise(resolve => resolve(heros.filter(h => h.name.match(regex))))
        let pos = heros.filter(h => h.name.match(regex));
        console.log(val.length);
        console.log(fullArr);
        setHeros(val.length === 0?fullArr:pos);
    }
    
    console.log(heros);
    if((!heros || heros.length === 0) && (!fullArr || fullArr.length === 0)){
        return <Skeleton/>
    }
  return (
      <>
        <Row Style="margin-top: 50px;">
            <Col span={24}>
                <div className="searchHeros">
                    <Input onChange={searchHero} type="text" placeholder="Search"/>
                </div>
            </Col>
        </Row>  
        <Row className="heroWrap">
        {heros.map(hero=>
            <Col key={hero.id} xl={4} xs={24} lg={24} sm={24} md={6}>
                <div className="heroBox">
                    <div className="thumbNail">
                        <img src={hero.thumbnail.path+'.jpg'} alt={hero.name} />
                    </div>
                    <div className="heroDescription">
                        <h1>{hero.name}</h1>
                    </div>
                </div>
            </Col>
        )}
        </Row>
      </>
      
  )
}

export default FetchHeros

