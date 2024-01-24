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
    const response = await fetch('https://braftovi-interactive-website-hy2310107-7aoeuk1ao.vercel.app/record', {
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

    result.forEach(data => {
      if (data.score === 0) {
        temp.four.push({
          score: data.score,
          name: data.user.username,
          id: data._id
        });
      } else if (data.score === 50) {
        temp.three.push({
          score: data.score,
          name: data.user.username,
          id: data._id
        });
      } else if (data.score === 100) {
        temp.two.push({
          score: data.score,
          name: data.user.username,
          id: data._id
        });
      } else {
        temp.one.push({
          score: data.score,
          name: data.user.username,
          id: data._id
        });
      }
    });

    setRankingData(temp);
  };

  useEffect(() => {
    if (message.type === 'R') {
      fetchRankingData();
    }
  }, [message.type]);

  const init = styled.div`
    position: absolute;
    color: white;
    font-size: 26px;
  `;

  const [RankingList, setRankingList] = useState(init);
  const [RankingList2, setRankingList2] = useState(init);
  const [RankingList3, setRankingList3] = useState(init);
  const [RankingList4, setRankingList4] = useState(init);

  useEffect(() => {
    if (rankingData.one.length > 0) {
      let count = rankingData.one.length * 2 - 1;
      let duration = (100 / count);
      let offset = duration - 5;
      const ani = keyframes`
        ${rankingData.one.map((data, i) => {
      
            return `
              ${(duration + offset) * i}%, ${((duration + offset) * i) + duration}% {
                transform: translate3d( 0, -${(100 / rankingData.one.length) * (i)}%, 0);
              }
            `;
          
        })}
        100% {
          transform: translate3d( 0, -${(100 / rankingData.one.length) * (rankingData.one.length - 1)}%, 0);
        }
      `;
      const rankingList = styled.div`
        position: absolute;
        color: white;
        font-size: 26px;
        animation-name: ${ani};
        animation-duration: ${rankingData.one.length * 3}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      `;

      setRankingList(rankingList);
    }

    if (rankingData.two.length > 0) {
      let count = rankingData.two.length * 2 - 1;
      let duration = (100 / count);
      let offset = duration - 5;
      const ani = keyframes`
        ${rankingData.two.map((data, i) => {
      
            return `
              ${(duration + offset) * i}%, ${((duration + offset) * i) + duration}% {
                transform: translate3d( 0, -${(100 / rankingData.two.length) * (i)}%, 0);
              }
            `;
          
        })}
        100% {
          transform: translate3d( 0, -${(100 / rankingData.two.length) * (rankingData.two.length - 1)}%, 0);
        }
      `;
      const rankingList = styled.div`
        position: absolute;
        color: white;
        font-size: 26px;
        animation-name: ${ani};
        animation-duration: ${rankingData.two.length * 3}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      `;

      setRankingList2(rankingList);
    }
    if (rankingData.three.length > 0) {
      let count = rankingData.three.length * 2 - 1;
      let duration = (100 / count);
      let offset = duration - 5;
      const ani = keyframes`
        ${rankingData.three.map((data, i) => {
      
            return `
              ${(duration + offset) * i}%, ${((duration + offset) * i) + duration}% {
                transform: translate3d( 0, -${(100 / rankingData.three.length) * (i)}%, 0);
              }
            `;
          
        })}
        100% {
          transform: translate3d( 0, -${(100 / rankingData.three.length) * (rankingData.three.length - 1)}%, 0);
        }
      `;
      const rankingList = styled.div`
        position: absolute;
        color: white;
        font-size: 26px;
        animation-name: ${ani};
        animation-duration: ${rankingData.three.length * 3}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      `;

      setRankingList3(rankingList);
    }
    if (rankingData.four.length > 0) {
      let count = rankingData.four.length * 2 - 1;
      let duration = (100 / count);
      let offset = duration / 2;
      const ani = keyframes`
        ${rankingData.four.map((data, i) => {
      
            return `
              ${(duration + offset) * i}%, ${((duration + offset) * i) + duration}% {
                transform: translate3d( 0, -${(100 / rankingData.four.length) * (i)}%, 0);
              }
            `;
          
        })}
        100% {
          transform: translate3d( 0, -${(100 / rankingData.four.length) * (rankingData.four.length - 1)}%, 0);
        }
      `;
      const rankingList = styled.div`
        position: absolute;
        color: white;
        font-size: 26px;
        animation-name: ${ani};
        animation-duration: ${rankingData.four.length * 3}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      `;

      setRankingList4(rankingList);
    }
  }, [rankingData]);

  


  return (
    <div className="background">
      {
        message.type === 'R' &&
        <>
          <div className="ranking-list-container" style={{ top: '136px', left: '288px' }}>
            <RankingList>
              {
                rankingData.one.map((data) => <div key={data.id} style={{ marginBottom: '1rem' }}>{data.name}</div>)
              }
            </RankingList>
          </div>
          <div className="ranking-list" style={{ top: '136px', left: '548px' }}>
            {
              150
            }
          </div>
          <div className="ranking-list-container" style={{ top: '293px', left: '288px' }}>
            <RankingList2>
              {
                rankingData.two.map((data) => <div key={data.id} style={{ marginBottom: '1rem' }}>{data.name}</div>)
              }
            </RankingList2>
          </div>
          <div className="ranking-list" style={{ top: '293px', left: '548px', color: 'white' }}>
            {
              100
            }
          </div>
          <div className="ranking-list-container" style={{ top: '446px', left: '288px' }}>
            <RankingList3>
              {
                rankingData.three.map((data) => <div key={data.id} style={{ marginBottom: '1rem' }}>{data.name}</div>)
              }
            </RankingList3>
          </div>
          <div className="ranking-list" style={{ top: '446px', left: '548px', textAlign: 'center', width: '46px' }}>
            50
          </div>
          <div className="ranking-list-container" style={{ top: '583px', left: '288px' }}>
            <RankingList4>
              {
                rankingData.four.map((data) => <div key={data.id} style={{ marginBottom: '1rem' }}>{data.name}</div>)
              }
            </RankingList4>
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
}
