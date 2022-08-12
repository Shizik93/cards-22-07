import {Button} from "@mui/material";
import s from './LearnPage.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useState} from "react";
import {FetchCardsListTC, GradeCardTC} from "../cardslist-page/cardslist-reducer/cardsListReducer";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {PATH} from "../../../common/components/RoutesBlock/RoutesBlock";

export const LearnPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [cardNumber, changeCardNumber] = useState(0)
    const [answer, setAnswer] = useState(false)
    const {id} = useParams<{ id: string }>()
    const packList = useAppSelector(state => state.packsList.cardPacks.filter(el => el._id === id))
    const cardsPack = useAppSelector(state => state.cardsList.cards)
    const answerArray = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
    const [grade, setGrade] = useState(1)
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

                {answer && <div>
                  <div className={s.answer_container}>
                      {cardsPack[cardNumber] && cardsPack[cardNumber].answer}
                    <FormControl>
                      <FormLabel>Rate yourself</FormLabel>
                      <RadioGroup defaultValue={answerArray[0]}>
                          {answerArray && answerArray.map((el, index) => {
                              return (
                                  <FormControlLabel onClick={() => {
                                      setGrade(index + 1)
                                  }} key={el} value={el}
                                                    control={<Radio/>} label={el}/>
                              )

                          })}
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <Button onClick={() => {
                      changeCardNumber(0)
                      navigate(PATH.PACKSLISTPAGE)
                  }} variant={'contained'}>Exit</Button>
                  <Button variant={'contained'} onClick={() => {
                      if (cardNumber === cardsPack.length - 1) {
                          changeCardNumber(0)
                      }
                      if (cardNumber !== cardsPack.length - 1) {
                          changeCardNumber(cardNumber + 1)
                      }
                      dispatch(GradeCardTC(cardsPack[cardNumber]._id, grade))
                      setAnswer(false)


                  }}>Next</Button>
                </div>}
                {!answer && <Button onClick={() => setAnswer(true)} variant={'contained'}>Show answer</Button>}
            </div>
        </div>
    )
}
