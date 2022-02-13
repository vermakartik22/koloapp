import {Row, Col, Input, Skeleton } from "antd";
import { getMarvelCharactars } from '../services';
import {useState,useEffect} from 'react';

const FetchHeros = function(){
    const [heros,setHeros] = useState([]);
    const [fullArr,setFullArr] = useState([]);
    
    useEffect(()=>{
        getMarvelCharactars().then((response) => {
            if (response && response.status === 200) {
                setHeros(response && response.data.data.results);
                setFullArr(response && response.data.data.results);
            }
        })
    },[]);

    const searchHero = (value) =>{
        let val = value.target.value;
        const regex = new RegExp(val);
        let pos = heros.filter(h => h.name.match(regex));
        setHeros(val.length === 0?fullArr:pos);
    }
    
  return (
    <div className="wrap">
        <Row Style="margin-top: 50px;">
            <Col span={24}>
                <div className="searchHeros">
                    <Input onChange={searchHero} type="text" placeholder="Search"/>
                </div>
            </Col>
        </Row>
        {(!heros || heros.length === 0) && <Skeleton/>}
        {(heros && heros.length !== 0) && <Row className="heroWrap">
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
        </Row>}
    </div>
      
  )
}

export default FetchHeros

