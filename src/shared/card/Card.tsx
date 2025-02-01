import type { PropsWithChildren } from 'react';

interface Props {
  style?: React.CSSProperties;
}

export const Card = ({ children, style }: PropsWithChildren<Props>) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '10px',
        color: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      {children}
    </div>
  );
};
