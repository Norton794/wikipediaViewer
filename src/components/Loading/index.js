import {List} from '../../components/List/index';
import './index.css';
export const Loading = () => (
    <div className="ball-one">
      <div className="ball-two">
        <div className="ball-three"></div>
      </div>
    </div>
  );
  
  export const withLoading =
    (Component) =>
    ({ isLoading, ...rest }) =>
      isLoading ? <Loading /> : <Component {...rest} />;
  
  export const ListWithLoading = withLoading(List);