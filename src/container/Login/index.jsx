import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Suspense
} from 'react';
import { Cell, Input, Button, Toast } from 'zarm';
import cx from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import { post } from '@/utils';

import s from './style.module.less';

const Captcha = React.lazy(() => import('react-captcha-code'));

const Login = () => {
  const captchaRef = useRef();
  const [type, setType] = useState('login'); // 登录注册类型
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(''); // 验证码

  //  验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    setCaptcha(captcha);
  }, []);

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号');
      return;
    }
    if (!password) {
      Toast.show('请输入密码');
      return;
    }
    try {
      if (type == 'login') {
        const { data } = await post('/api/user/login', {
          username,
          password
        });
        localStorage.setItem('token', data.token);
        Toast.show('登录成功');
        window.location.href = '/';
      } else {
        if (!verify) {
          Toast.show('请输入验证码');
          return;
        }
        if (verify != captcha) {
          Toast.show('验证码错误');
          return;
        }
        const { data } = await post('/api/user/register', {
          username,
          password
        });
        Toast.show('注册成功');
        setType('login');
      }
    } catch (err) {
      Toast.show(err.msg);
    }
  };

  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册';
  }, [type]);

  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span
          className={cx({ [s.avtive]: type == 'login' })}
          onClick={() => setType('login')}
        >
          登录
        </span>
        <span
          className={cx({ [s.avtive]: type == 'register' })}
          onClick={() => setType('register')}
        >
          注册
        </span>
      </div>

      <div className={s.form}>
        <Cell className={s.zaCell} icon={<CustomIcon type="zhanghao" />}>
          <Input
            className={s.zaInput}
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value) => setUsername(value)}
          />
        </Cell>

        <Cell className={s.zaCell} icon={<CustomIcon type="mima" />}>
          <Input
            className={s.zaInput}
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value) => setPassword(value)}
          />
        </Cell>

        {type == 'register' ? (
          <Cell className={s.zaCell} icon={<CustomIcon type="mima" />}>
            <Input
              className={s.zaInput}
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={(value) => setVerify(value)}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
            </Suspense>
          </Cell>
        ) : null}
      </div>

      <div className={s.operation}>
        <Button
          className={s.customGradientButton}
          onClick={onSubmit}
          block
          theme="primary"
          shape="round"
        >
          {type == 'login' ? '登录' : '注册'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
