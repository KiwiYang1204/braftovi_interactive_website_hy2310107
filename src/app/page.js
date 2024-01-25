'use client';
import "./page.css";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./context/socket";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

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
        <Image 
          src="http://34.82.217.255:8080/assets/ranking.png"
          width={768}
          height={960}
          alt="ranking"
        />
      }
      {
        message.type === 'Q' &&
        message.round === 1 &&
        <Image 
          src="http://34.82.217.255:8080/assets/q1.png"
          width={768}
          height={960}
          alt='q1'
        />
      }
      {
        message.type === 'A' &&
        message.round === 1 &&
        message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a1v.png"
          width={768}
          height={960}
          alt="a1v"
        />
      }
      {
        message.type === 'A' &&
        message.round === 1 &&
        !message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a1x.png"
          width={768}
          height={960}
          alt='a1x'
        />
      }
      {
        message.type === 'Q' &&
        message.round === 2 &&
        <Image 
          src="http://34.82.217.255:8080/assets/q2.png"
          width={768}
          height={960}
          alt='q2'
        />
      }
      {
        message.type === 'A' &&
        message.round === 2 &&
        message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a2v.png"
          width={768}
          height={960}
          alt='a2v'
        />
      }
      {
        message.type === 'A' &&
        message.round === 2 &&
        !message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a2x.png"
          width={768}
          height={960}
          alt='a2x'
        />
      }
      {
        message.type === 'Q' &&
        message.round === 3 &&
        <Image 
          src="http://34.82.217.255:8080/assets/q3.png"
          width={768}
          height={960}
          alt='q3'
        />
      }
      {
        message.type === 'A' &&
        message.round === 3 &&
        message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a3v.png"
          width={768}
          height={960}
          alt='a3v'
        />
      }
      {
        message.type === 'A' &&
        message.round === 3 &&
        !message.isCorrect &&
        <Image 
          src="http://34.82.217.255:8080/assets/a3x.png"
          width={768}
          height={960}
          alt='a3x'
        />
      }
      {
        message.type === 'S' &&
        message.score === 0 &&
        <Image 
          src="http://34.82.217.255:8080/assets/0p.png"
          width={768}
          height={960}
          alt='0p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 50 &&
        <Image 
          src="http://34.82.217.255:8080/assets/50p.png"
          width={768}
          height={960}
          alt='50p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 100 &&
        <Image 
          src="http://34.82.217.255:8080/assets/100p.png"
          width={768}
          height={960}
          alt='100p'
        />
      }
      {
        message.type === 'S' &&
        message.score === 150 &&
        <Image 
          src="http://34.82.217.255:8080/assets/150p.png"
          width={768}
          height={960}
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
