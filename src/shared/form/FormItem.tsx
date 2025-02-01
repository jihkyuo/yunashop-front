import { PropsWithChildren } from 'react';

interface Props {
  label: string;
  errorMessage?: string;
}

export const FormItem = ({ children, label, errorMessage }: PropsWithChildren<Props>) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {children}
        {errorMessage && <span style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</span>}
      </div>
    </label>
  );
};
