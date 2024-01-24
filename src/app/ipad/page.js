'use client';
import { SocketContext } from '../context/socket';
import './page.css';
import { useContext, useEffect, useState } from 'react';

const HomeIpad = () => {
  const [userId, setUserId] = useState(null);
  const wsCtx = useContext(SocketContext);

  const [state, setState] = useState(0);
  const [round, setRound] = useState([]);

  useEffect(() => {
    if (state === 3) {
      const point = round.filter(p => p).length * 50;
      fetch('http://34.82.217.255:8080/record', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          id: userId,
          score: point,
        })
      });
      setRound([]);
    }
  }, [state]);

  const createUser = async (val) => {
    const result = await fetch('http://34.82.217.255:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: val
      })
    });
    const res = await result.json();

    setUserId(res.id);
  };

  const calculateHandler = (ans) => {
    const count = round.length + 1; // 第幾回
    let res = false;
    if (count === 1 && ans === 1) {
      res = true;
    } else if (count === 2) {
      if (ans === 1 || ans === 2) {
        res = true;
      }
    } else {
      if (ans === 4 && count === 3) {
        res = true;
      }
    }
    setRound([...round, res]);

    const message = {
      round: count,
      isCorrect: res,
      type: 'A'
    };
    wsCtx.sendMessage(message);
  };

  const displayQuestion = () => {
    if (round.length < 3) {
      wsCtx.sendMessage({
        type: 'Q',
        round: round.length + 1
      });
    } else {
      wsCtx.sendMessage({
        type: 'S',
        score: round.filter(p => p).length * 50
      });
    }
  };

  return (
    <div className="layout-ipad">
      {
        state === 0 && <InitPage onClick={arg => setState(arg)} onShow={displayQuestion} onCreate={createUser}/>
      }
      {
        state === 1 && <SelectPage onClick={arg => setState(arg)} 
          onNext={calculateHandler} />
      }
      {
        state === 2 && <IdlePage onClick={arg => setState(arg)} round={round} onShow={displayQuestion}/>
      }
      {
        state === 3 && <WaitingPage onClick={arg => setState(arg)}/>
      }
    </div>
  );
};

const InitPage = ({ onClick, onShow, onCreate }) => {
  const [name, setName] = useState('');
  return (
      <div>
        <div className='form-group form-label'>姓名</div>
        <div className='form-group'>
          <input 
            className='form-input'
            placeholder='請輸入您的姓名'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div 
          className='form-group'
          onClick={() => {
            onClick(1);
            onShow();
            onCreate(name);
            setName('');
          }}
        >
          <img 
            src='/assets/send-btn.png'
            alt='send-button'
          />
        </div>
      </div>
  );
};

const SelectPage = ({ onClick, onNext, answer }) => {
  return(
    <div className='form-selection'>
      <img
        src='/assets/card-1.png'
        alt='card-1'
        onClick={() => {
          onClick(2);
          onNext(1);
        }}
      />
      <img 
        src='/assets/card-2.png'
        alt='card-2'
        onClick={() => {
          onClick(2);
          onNext(2);
        }}
      />
      <img 
        src='/assets/card-4.png'
        alt='card-4'
        onClick={() => {
          onClick(2);
          onNext(4);
        }}
      />
    </div>
  );
};

const IdlePage = ({ onClick, round, onShow }) => {
  return (
    <>
      {  
          round.length === 3
            ? <img 
                src='/assets/calculate-btn.png'
                alt='calculate-btn'
                onClick={() => {
                  onClick(3);
                  onShow();
                }}
            />
            : <img 
                src='/assets/next-btn.png'
                alt='next-btn'
                onClick={() => {
                  onClick(1);
                  onShow();
                }}
            />
        }
    </>
  );
};

const WaitingPage = ({ onClick }) => {
  const wsCtx = useContext(SocketContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClick(0);
      wsCtx.sendMessage({
        type: 'R'
      });
    }, 8000);

    return () => clearTimeout(timer);
  }, []);
  return <div>計算中......</div>
};

export default HomeIpad;