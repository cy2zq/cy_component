import type { DrawerProps as AntdDrawerProps } from 'antd';
import { Drawer as AntdDrawer } from 'antd';
import type { PropsWithModalEnhanced, UseModalEnhancedProps } from '../hooks';
import { useModalEnhanced } from '../hooks';
import usePrefixCls from '../hooks/usePrefixCls';
import type { AnyObj } from '../types';

/** @internal */
type CloseCallback = Pick<AntdDrawerProps, 'onClose'>;

export type DrawerProps = Omit<AntdDrawerProps, 'visible' | 'children'> & UseModalEnhancedProps;
/**
 * @description 方便用户自定义 `Modal` 的 `props`
 * @since 1.6.0
 */
export type DrawerContentPropsWithEnhanced<P extends AnyObj = AnyObj> = PropsWithModalEnhanced<
  P,
  CloseCallback
>;

/** @see [chaoyang_component#Drawer](https://github.com/cy2zq/chaoyang_component/blob/master/src/drawer/index.tsx) */
const Drawer = (props: DrawerProps) => {
  const prefixCls = usePrefixCls('drawer', props.prefixCls);
  const [visible, { close }, { trigger, content }, restProps] =
    useModalEnhanced<CloseCallback>(props);

  const handleModalCancel: DrawerProps['onClose'] = (event) => {
    console.log('cy');
    close('onClose', event);
  };

  return (
    <>
      {trigger}
      <AntdDrawer open={visible} {...restProps} onClose={handleModalCancel} prefixCls={prefixCls}>
        {content}
      </AntdDrawer>
    </>
  );
};

export default Drawer;
