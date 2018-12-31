export default ({ title, className }) => (
    <div className={classNames('aside-logo', className)}>
        <a href="javascript:;">
            <img src={require('./logo.svg')} />
            <h1>{title}</h1>
        </a>
    </div>
);
