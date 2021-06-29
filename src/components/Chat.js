import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext, useState } from 'react'
import { Context } from '../index'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import firebase from 'firebase';

function Chat() {
    const { auth, firestore } = useContext(Context) //хук реакта для передачи данных от родителя
    const [user] = useAuthState(auth) //хук из модуля react-firebase-hooks
    const [value, setValue] = useState('') //сделаем Input управляемый
    const [messages, loading] = useCollectionData(  //хук из модуля react-firebase-hooks он возвращает картеж 1 сообщение 2 лоадинг, делаем сразуже сортировку сообщений по дате с помощью orderBy
        firestore.collection('messages').orderBy('createdAt')
    )
    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    } //сохраняем сообщения в базу передаем объект с любыми произвольными параметрами: id пользователя, имя, ссылку на аватарку, также сообщение с датой отправкой сообщения. После того как передали сообщение чистим инпут через SetValue передавая туда пустую строку.

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 55, marginTop: '5px' }} //фиксируем высоту видимой области, чтобы не было скролла, и делаем отступ от navbar
                justify={'center'}>
                <div className='chat'>

                    {messages.map(message =>// отрисовывем все сообщения с firebase
                        <div key={message.createdAt}
                            className={user.uid === message.uid ? 'messages' : 'messages-unknown'}// ЗДЕСЬ и в следующих тернарных выражениях делаем различие между своими и чужими сообщениями
                        >
                            <Grid container>
                                <div className={user.uid === message.uid ? 'bubble' : 'bubble-unknown'}>
                                    <div className={user.uid === message.uid ? 'displayName' : 'displayName-unknown'}>
                                        {message.displayName // выводим имя
                                        }
                                    </div>
                                    <div className={user.uid === message.uid ? 'message' : 'message-unknown'}>
                                        {message.text //выводим текст сообщения
                                        }
                                    </div>
                                </div>
                                <div className={user.uid === message.uid ? 'avatar' : 'avatar-unknown'}>
                                    <Avatar src={message.photoURL //выводим аватра с Google
                                    } />
                                </div>
                            </Grid>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{ width: '80%' }}
                >
                    <TextField // инпут для ввода сообщений
                        fullWidth
                        rowsMax={2}
                        variant={'outlined'}
                        value={value}
                        onChange={e => setValue(e.target.value) // посредсвом синтетической обертки предоставляемой реактом делаем контролируемый инпут связывае его со state через setState
                        }
                    />
                    <Button
                        onClick={sendMessage // acсинхронная функция для отправки сообщений на сервер
                        }
                        variant={'outlined'}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>

        </Container >
    )
}

export default Chat
