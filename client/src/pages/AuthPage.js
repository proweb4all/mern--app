import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1 className='center'>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title center">Авторизация</span>
            <div>
              <div className="input-field">
                <input 
                  placeholder="Email" 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="yellow-input validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Введите email</label>
              </div>
              <div className="input-field">
                <input 
                  placeholder="Пароль" 
                  id="password" 
                  name="password" 
                  type="password" 
                  className="yellow-input validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Введите пароль</label>
              </div>
            </div>
          </div>
          <div className="block-btns card-action">
            <button 
              className='btn #80d8ff light-blue accent-1 black-text'
              onClick={loginHandler}
              disabled={loading}
            >Войти
            </button>
            <button 
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >Регистрация
            </button>
          </div>
        </div>        
      </div>
    </div>
  )
}