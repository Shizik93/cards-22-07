import {Button} from "@mui/material";
import s from './LearnPage.module.css'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useState} from "react";
import {FetchCardsListTC} from "../cardslist-page/cardslist-reducer/cardsListReducer";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const LearnPage = () => {
    const dispatch = useAppDispatch()
    const [cardNumber, changeCardNumber] = useState(0)
    const [answer, setAnswer] = useState(false)
    const {id} = useParams<{ id: string }>()
    const packList = useAppSelector(state => state.packsList.cardPacks.filter(el => el._id === id))
    const cardsPack = useAppSelector(state => state.cardsList.cards)
    const answerArray = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
    useEffect(() => {
        id && dispatch(FetchCardsListTC({id}))
    }, [dispatch, id])
    return (

        <div className={s.learn_page}>
            <div className={s.header_text}>Learn "{packList && packList[0].name}"</div>
            <div className={s.learn_page_container}>
                <div>
                    <b>Question</b>:{cardsPack[cardNumber] && cardsPack[cardNumber].question}
                </div>
                <div>
                    Количество попыток ответов на вопрос: 10
                </div>
                {answer && <div>
                  <div className={s.answer_container}>
                      {cardsPack[cardNumber] && cardsPack[cardNumber].answer}
                    <FormControl>
                      <FormLabel>Rate yourself</FormLabel>
                      <RadioGroup>
                          {answerArray && answerArray.map((el) => {
                              return (
                                  <FormControlLabel key={el} value={el} control={<Radio/>} label={el}/>
                              )

                          })}
                      </RadioGroup>
                    </FormControl>
                  </div>
                    {cardNumber === cardsPack.length - 1 ? <Button variant={'contained'}>Exit</Button> :
                        <Button variant={'contained'} onClick={() => {
                            setAnswer(false)
                            changeCardNumber(cardNumber + 1)
                        }}>Next</Button>}
                </div>}
                {!answer && <Button onClick={() => setAnswer(true)} variant={'contained'}>Show answer</Button>}
            </div>
        </div>
    )
}
