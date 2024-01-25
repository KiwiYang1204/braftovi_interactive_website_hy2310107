'use client';
import "./page.css";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./context/socket";
import styled, { keyframes } from "styled-components";

export default function Home() {
  const { message, sendMessage } = useContext(SocketContext);
  const [rankingData, setRankingData] = useState({
    one: [],
      two: [],
      three: [],
      four: []
  });

  const fetchRankingData = async () => {
    const response = await fetch('http://34.82.217.255:8080/record', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'get'
    });

    const { result } = await response.json();

    let temp = {
      one: [],
      two: [],
      three: [],
      four: []
    };

    const scoreCategories = {
      0: temp.four,
      50: temp.three,
      100: temp.two,
    };
    
    result.forEach(data => {
      const category = scoreCategories[data.score] || temp.one;
      category.push({ score: data.score, name: data.user.username, id: data._id });
    });

    setRankingData(temp);
  };

  useEffect(() => {
    if (message.type === 'R') {
      fetchRankingData();
    }
  }, [message.type]);

  return (
    <div className="background">
      {
        message.type === 'R' &&
        <>
          <div className="ranking-list-container" style={{ top: '136px', left: '288px' }}>
            <RankingList 
              item={rankingData.one}
            />
          </div>
          <div className="ranking-list" style={{ top: '136px', left: '548px' }}>
            {
              150
            }
          </div>
          <div className="ranking-list-container" style={{ top: '288px', left: '288px' }}>
            <RankingList 
              item={rankingData.two}
            />
          </div>
          <div className="ranking-list" style={{ top: '293px', left: '548px', color: 'white' }}>
            {
              100
            }
          </div>
          <div className="ranking-list-container" style={{ top: '443px', left: '288px' }}>
            <RankingList 
              item={rankingData.three}
            />
          </div>
          <div className="ranking-list" style={{ top: '446px', left: '548px', textAlign: 'center', width: '46px' }}>
            50
          </div>
          <div className="ranking-list-container" style={{ top: '580px', left: '288px' }}>
            <RankingList 
              item={rankingData.four}
            />
          </div>
          <div className="ranking-list" style={{ top: '583px', left: '548px', textAlign: 'center', width: '46px' }}>
            {
              0
            }
          </div>
        </>
      }
      {
        message.type === 'R' &&
        <img 
          src='/assets/ranking.png'
          alt='ranking'
        />
      }
      {
        message.type === 'Q' &&
        message.round === 1 &&
        <img 
          src='/assets/q1.png'
          alt='q1'
        />
      }
      {
        message.type === 'A' &&
        message.round === 1 &&
        message.isCorrect &&
        <img 
          src='/assets/a1v.png'
          alt='a1v'
        />
      }
      {
        message.type === 'A' &&
        message.round === 1 &&
        !message.isCorrect &&
        <img 
          src='/assets/a1x.png'
          alt='a1x'
        />
      }
      {
        message.type === 'Q' &&
        message.round === 2 &&
        <img 
          src='/assets/q2.png'
          alt='q2'
        />
      }
      {
        message.type === 'A' &&
        message.round === 2 &&
        message.isCorrect &&
        <img 
          src='/assets/a2v.png'
          alt='a2v'
        />
      }
      {
        message.type === 'A' &&
        message.round === 2 &&
        !message.isCorrect &&
        <img 
          src='/assets/a2x.png'
          alt='a2x'
        />
      }
      {
        message.type === 'Q' &&
        message.round === 3 &&
        <img 
          src='/assets/q3.png'
          alt='q3'
        />
      }
      {
        message.type === 'A' &&
        message.round === 3 &&
        message.isCorrect &&
        <img 
          src='/assets/a3v.png'
          alt='a3v'
        />
      }
      {
        message.type === 'A' &&
        message.round === 3 &&
        !message.isCorrect &&
        <img 
          src='/assets/a3x.png'
          alt='a3x'
        />
      }
      {
        message.type === 'S' &&
        message.score === 0 &&
        <img 
          src='/assets/0p.png'
          alt='0p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 50 &&
        <img 
          src='/assets/50p.png'
          alt='50p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 100 &&
        <img 
          src='/assets/100p.png'
          alt='100p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 150 &&
        <img 
          src='/assets/150p.png'
          alt='150p'
        />
      }
    </div>
  );
};

const RankingList = ({ item  }) => {
  // 時間軸分段
  let count = item.length * 2 - 1;
  // 每段的時間區間
  let duration = (100 / count);
  // 停留時間
  let offset = duration - 5;
  const ani = keyframes`
    ${item.map((data, i) => {
      return `
        ${(duration + offset) * i}%, ${((duration + offset) * i) + duration}% {
          transform: translate3d( 0, -${(100 / item.length) * (i)}%, 0);
        }
      `;
    })}
    100% {
      transform: translate3d( 0, -${(100 / item.length) * (item.length - 1)}%, 0);
    }
  `;
  const Ranking = styled.div`
    position: absolute;
    color: white;
    font-size: 26px;
    animation-name: ${ani};
    animation-duration: ${item.length * 3}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  `;
  
  return (
    <Ranking>
      {
        item.map((data) => 
          <div key={data.id} className="ranking-list-name">{data.name}</div>
        )
      }
    </Ranking>
  );
};
