import React, { useEffect, useState } from 'react';
import Player from "../Player/index.jsx";
import Boss from "../Boss/index.jsx";
import './Ctolevel.css';
import {useNavigate} from "react-router-dom";

const CtoLevel = () => {
    const navigate = useNavigate();
    const [bossInterest, setBossInterest] = useState(0);
    const [playerHealth, setPlayerHealth] = useState(30);
    const [charm, setCharm] = useState(30);
    const [isBossAttacking, setIsBossAttacking] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedPower, setSelectedPower] = useState(null);
    const [powerText, setPowerText] = useState("");
    const charmSkills = [
        { name: 'Think about your answer - 2 Charm', description: 'Take a moment to formulate a thoughtful response. Raise interest by 20' },
        { name: 'FACTS AND FIGURES - 4 charm', description: 'Impress them with relevant facts and figures. Raise interest by 30' },
        { name: 'The Ultimate answer - 8 charm', description: 'Unleash the ultimate answer to captivate them. Raise interest by 60' },
        { name: 'Boost your confidence - 3 charm', description: 'Boost your confidence and leave a lasting impression. Heal your confidence 10' },
    ];
    const powers = ['shouts Fizz Buzz at you', 'asks why you did it in React', "says you've missed a semi colon", 'affirms with a thoughtful nod', 'just shakes their head'];
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (playerHealth === 0) {
            badInterview();
        }
        if (bossInterest >= 300) {
            goodInterview();
        }
    }, [playerHealth, bossInterest]);

    const handlePlayerAttack = () => {
        setBossInterest((prevInterest) => Math.min(300, prevInterest + 10));

        setTimeout(() => {
            setIsBossAttacking((prevIsBossAttacking) => !prevIsBossAttacking);
        }, 500);
    }

    const handleUseSkill = (selectedSkill) => {
        if (selectedSkill.name.includes('charm') && charm === 0) {
            setErrorMessage('Not enough charm to use this skill!');
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
            return;
        }
        switch (selectedSkill.name) {
            case 'Think about your answer - 2 Charm':
                if (charm >= 2) {
                    setCharm((prevCharm) => Math.max(0, prevCharm - 2));
                    setBossInterest((prevInterest) => Math.min(300, prevInterest + 20));
                } else {
                    setIsBossAttacking(false);
                    setErrorMessage('Not enough charm to use this skill!');
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1000)
                    return;
                }
                break;
            case 'FACTS AND FIGURES - 4 charm':
                if (charm >= 4) {
                    setCharm((prevCharm) => Math.max(0, prevCharm - 4));
                    setBossInterest((prevInterest) => Math.min(300, prevInterest + 30));
                } else {
                    setIsBossAttacking(false);
                    setErrorMessage('Not enough charm to use this skill!');
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1000)
                    return;
                }
                break;
            case 'The Ultimate answer - 8 charm':
                if (charm >= 8) {
                    setCharm((prevCharm) => Math.max(0, prevCharm - 8));
                    setBossInterest((prevInterest) => Math.min(300, prevInterest + 60));
                } else {
                    setIsBossAttacking(false);
                    setErrorMessage('Not enough charm to use this skill!');
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1000)
                    return;
                }
                break;

            case 'Boost your confidence - 3 charm':
                if (charm >= 3) {
                    setCharm((prevCharm) => Math.max(0, prevCharm - 3));
                    setPlayerHealth((prevHealth) => Math.max(0, prevHealth + 10));
                } else {
                    setIsBossAttacking(false);
                    setErrorMessage('Not enough charm to use this skill!');
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 1000)
                    return;
                }
                break;
            default:
        } setTimeout(() => {
            setIsBossAttacking((prevIsBossAttacking) => !prevIsBossAttacking);

        }, 1000);
        setErrorMessage("");
    };


    const handleBossPowerUsed = () => {
        const randomPower = powers[Math.floor(Math.random() * powers.length)];
        setSelectedPower(randomPower);

        switch (randomPower) {
            case 'shouts Fizz Buzz at you':
                setPlayerHealth((prevHealth) => Math.max(0, prevHealth - 4));
                setPowerText("You've lost 4 confidence");
                break;
            case 'asks why you did it in React':
                setPlayerHealth((prevHealth) => Math.max(0, prevHealth - 8));
                setPowerText("You've lost 8 confidence");
                break;
            case "says you've missed a semi colon" :
                setPlayerHealth((prevHealth) => Math.max(0, prevHealth - 2));
                setPowerText("You've lost 2 confidence");
                break;
            case 'affirms with a thoughtful nod':
                setPlayerHealth((prevHealth) => Math.max(0, prevHealth + 4));
                setPowerText("You've gained 4 confidence");
                break;
            case 'just shakes their head':
                setPlayerHealth((prevHealth) => Math.max(0, prevHealth - 6));
                setPowerText("You've lost 6 confidence");
                break;
            default:
                break;
        }

        setTimeout(() => {
            setIsBossAttacking(false);
        }, 3000);
    };

    const goodInterview = () => {
        setIsBossAttacking(false);
        setTimeout(() => {
            navigate("/IntroToCto/");
        }, 2000);
    };


    const badInterview = () => {
        setTimeout(() => {
            navigate("/failedInterview/");
        }, 2000);
    };

    useEffect(() => {
        if (isBossAttacking) {
            handleBossPowerUsed();
        }
    }, [isBossAttacking]);

    return (
        <>
            <Boss bossName={"CTO Interest:"} bossInterest={bossInterest} maxInterest={300} />
            <div className="recruiterLevel">
                <img className="bossImage" src="/src/assets/recruiter.jpg" />
            </div>
            <div className="boss-powers-layout">
                {isBossAttacking ? null : <p className="boss-powers">The CTO is inspecting you...</p>}
                {errorMessage && <p className="boss-powers">{errorMessage}</p>}
                {isBossAttacking && <p className="boss-powers">The CTO {selectedPower}</p>}
                {isBossAttacking && <p className="boss-powers">{powerText}</p>}
            </div>
            <Player
                playerName="Strong Candidate"
                onAttack={handlePlayerAttack}
                onUseSkill={handleUseSkill}
                health={playerHealth}
                charm={charm}
                isBossAttacking={isBossAttacking}
                charmSkills={charmSkills}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
            />
        </>
    );
};

export default CtoLevel;