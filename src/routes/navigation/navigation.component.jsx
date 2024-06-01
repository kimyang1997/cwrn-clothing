import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment> 
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link className='nav-link' to='/sign-in'>
                        SIGN IN 
                    </Link>
                </div>
            </div>
            {/* 插入pages down below也就是所有的子组件的路由
                访问 / 时，<Outlet /> 将渲染 <Home /> 组件。
                访问 /shop 时，<Outlet /> 将渲染 <Shop /> 组件。
                访问 /sign-in 时，<Outlet /> 将渲染 <SignIn /> 组件。 */}
            <Outlet />
        </Fragment>
    )
  }

export default Navigation;