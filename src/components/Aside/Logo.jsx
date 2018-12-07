export default ({ title }) => (
    <div className="aside-logo">
        <a href="javascript:;">
            <img src={require('./logo.svg')} />
            <h1>{title}</h1>
        </a>
    </div>
);
