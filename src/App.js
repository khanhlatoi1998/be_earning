import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight, AiOutlineSave } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { BounceLoader } from "react-spinners";

function App() {
    // answer 1
    let arr_1 = [0, 10, 1, 99, 91, 8, 79, 9, 22, 32, 12];
    let arr_2 = [99, 19, 29, 39, 11, 21, 32, 33, 35, 50, 60, 90];
    let arr_3 = [1, 10, 19, 11, 13, 16, 19];

    const customSort = (arr) => {
        const result = arr.sort((a, b) => {
            let ab = String(a) + String(b);
            let ba = String(b) + String(a);
            return ba - ab;
        });
        console.log(result);
    };

    customSort(arr_1);
    customSort(arr_2);
    customSort(arr_3);

    const [listWord, setListWord] = useState([]);
    const [clickNext, setClickNext] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);
    const [numberSeed, setNumberSeed] = useState(0);
    const timeDown = 3;
    const [count, setCount] = useState(timeDown);
    const [clickSave, setClickSave] = useState(false);

    const handleClickRadio = (e) => {
        const eleInput = document.querySelectorAll('input[type=radio]');
        let seed = 0;
        for (let i = 0; i < eleInput.length; i++) {
            if (eleInput[i].checked) {
                seed++;
            }
        }
        setNumberSeed(seed);
    }

    const handleSubmit = () => {
        setSubmit(true);
        setTimeout(() => {
            setError(true);
            setTimeout(() => {
                setSubmit(false);
            }, 2000)
        }, 1000)
    }

    const handleClickSave = () => {
        setClickSave(true);
        let countDown = count;
        let clearInt = setInterval(() => {
            setCount(c => c - 1);
            if (countDown < 1) {
                setClickSave(false);
                clearInterval(clearInt);
                setCount(timeDown);
            }
            countDown--;
        }, 1000)
    };

    useEffect(() => {
        axios
            .get("https://metanode.co/json/eng.json")
            .then((res) => {
                const data = res.data;
                const lengthList_24 = 24;
                const lengthList_18 = 18;
                // const list_24 = data.filter(item => data.lastIndexOf(item) === data.indexOf(item)).slice(0, lengthList_24);
                const list_24 = [];
                const list_18 = [];
                let flag_18 = 0;

                const handleList = (arr, length, result) => {
                    let flag = 0;
                    arr.forEach((item, index) => {
                        if (flag >= length) return;
                        if (result.indexOf(item)) {
                            result.push({
                                name: item,
                                index: index,
                            });
                            flag++;
                        }
                    });
                }
                handleList(data, lengthList_24, list_24);

                for (let i of list_24) {
                    if (flag_18 < lengthList_18) {
                        list_18.push(i);
                        flag_18++;
                    }
                }

                const createGroups = (arr, numGroups) => {
                    const perGroup = Math.ceil(arr.length / numGroups);
                    let wraperList = new Array(numGroups).fill([]);
                    let listGroup = wraperList.map((item, index) => {
                        let sliceList = arr.slice(index * perGroup, (index + 1) * perGroup)
                        let list = sliceList.map((work) => work.name)
                        let group = {
                            list: list,
                            primary_index: index * perGroup
                        };
                        return group;
                    });
                    return listGroup;
                }
                setListWord(list_24);
                setGroups(createGroups(list_18, 6));
                // createGroups(list_18, 6);
                console.log(createGroups(list_18, 6))
            })
            .catch((err) => { });
    }, [clickNext]);

    return (
        <div className="App">
            <div className="px-4 pt-8 bg-color_05">
                <div className="flex gap-2 py-4 items-center font-medium text-title">
                    <AiOutlineLeft />
                    <a href="#">Create New Wallet</a>
                </div>
                {
                    clickNext
                        ? <div className="pb-10">
                            <div className="flex items-center justify-between">
                                <p className="text-color_04 font-medium text-title">Confirm Your Seed Phrase</p>
                                <p>{numberSeed}/{groups.length}</p>
                            </div>
                            <div className="pt-4  flex flex-col gap-4">
                                {
                                    groups.map((item, index) => {
                                        return (
                                            <div key={item.primary_index} className="flex items-center justify-between gap-2 px-6 py-4 rounded-lg border border-solid border-color_07">
                                                <p className="w-[30px] h-[30px] rounded-full border border-solid border-color_04 flex items-center justify-center text-color_04 font-medium">{item.primary_index + 1}</p>
                                                {/* <p className="font-medium text-color_03 px-3 py-2 rounded-lg bg-color_08 cursor-pointer">Word</p> */}
                                                {
                                                    item.list.map((work, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <input onClick={handleClickRadio} className="hidden peer" type="radio" id={work} name={`work${item.primary_index}`} value={work} />
                                                                <label className="font-medium cursor-pointer text-color_03 peer-checked:rounded-lg px-3 py-2 peer-checked:text-color_04 peer-checked:bg-color_08" htmlFor={work}>{work}</label>
                                                                {/* <p className="font-medium text-color_03">{work}</p> */}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                error && <div className="flex items-center gap-4 pt-6">
                                    <span><BiError className="text-color_09 text-[20px]" /></span>
                                    <p className="text-color_09">Wrong seed phrases. Please try again!</p>
                                </div>
                            }
                        </div>
                        : <div>
                            <div className="text-color_04 font-medium text-title">
                                Auto Gen Seed Phrase?
                            </div>
                            <div>
                                <div className="grid grid-cols-3 gap-y-6 gap-x-4 py-4">
                                    {
                                        listWord?.map((item) => {
                                            return (
                                                <div key={item.index} className="flex items-center px-4 gap-2 bg-white rounded shadow-item py-2">
                                                    <p className="w-[30px] h-[30px] flex items-center justify-center rounded-full text-color_04 bg-color_06">
                                                        {item.index + 1}
                                                    </p>
                                                    <p className="text-color_03">{item.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 pt-4 pb-8">
                                <p className="">
                                    Tap to Copy or Carefully write down your seed phrase and store it in
                                    a safe place
                                </p>
                                <button onClick={handleClickSave}>
                                    <AiOutlineSave className="text-[50px] text-color_04 p-2 border border-solid border-color_04 rounded-xl" />
                                </button>
                            </div>
                        </div>
                }
                {
                    clickSave && <div className="fixed top-0 left-0 right-0 bottom-0 bg-color_10 flex items-end">
                        <div className="bg-white pb-10 w-full px-4 rounded-t-xl">
                            <div className="mt-2"><AiOutlineDown className="m-auto opacity-60" /></div>
                            <div className="text-center">
                                <span className="inline-block p-4 rounded-full bg-color_11 mx-auto mt-6">
                                    <AiOutlineSave className="text-white text-[30px]" />
                                </span>
                            </div>
                            <p className="mt-4 text-title font-medium text-center">Saved to clipboard</p>
                            <p className="text-center mt-10">
                                <span className="w-[30px] h-[30px] inline-block border-2 flex items-center justify-center border-solid border-color_09 text-color_09 rounded-full leading-[0] m-auto ">
                                    {count}s
                                </span>
                            </p>
                        </div>
                    </div>
                }

            </div>
            <div className="px-4 py-10 shadow-block">
                <div className="flex items-center justify-between">
                    <p className="text-title font-medium">How does this work?</p>
                    <span>
                        <AiOutlineRight />
                    </span>
                </div>
                <div>
                    {
                        clickNext === false
                            ? <button onClick={() => setClickNext(true)} className="bg-color_04 w-full py-4 mt-6 text-white font-bold text-title rounded-md">
                                NEXT
                            </button>
                            : <button onClick={handleSubmit} className={`${submit ? `bg-color_08` : `bg-color_04`}  w-full py-4 mt-6 text-white font-bold text-title rounded-md`}>
                                {
                                    submit === false
                                        ? <span>SUBMIT</span>
                                        : <BounceLoader color="#36d7b7" size={25} />
                                }
                            </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
