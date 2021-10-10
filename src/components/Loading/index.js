import {List} from '../../components/List/index';
import './index.css';
export const Loading = () => (
    <div class="ball-one">
      <div class="ball-two">
        <div class="ball-three"></div>
      </div>
    </div>
  );
  
  export const withLoading =
    (Component) =>
    ({ isLoading, ...rest }) =>
      isLoading ? <Loading /> : <Component {...rest} />;
  
  export const ListWithLoading = withLoading(List);