import styled from 'styled-components';

export const H1 = styled.h1.attrs({
  className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
})``;

export const H2 = styled.h2.attrs({
  className:
    'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
})``;

export const H3 = styled.h3.attrs({
  className: 'scroll-m-20 text-2xl font-semibold tracking-tight',
})``;

export const H4 = styled.h4.attrs({
  className: 'scroll-m-20 text-xl font-semibold tracking-tight',
})``;

export const PrimaryDefault = styled.p.attrs({
  className: 'leading-7 [&:not(:first-child)]:mt-6',
})``;

export const PrimaryLead = styled.p.attrs({
  className: 'text-xl text-muted-foreground',
})``;

export const PrimaryLarge = styled.p.attrs({
  className: 'text-lg font-semibold',
})``;

export const PrimaryMedium = styled.p.attrs({
  className: 'text-md',
})``;

export const PrimaryMediumMutted = styled.p.attrs({
  className: 'text-md text-muted-foreground',
})``;

export const PrimarySmall = styled.p.attrs({
  className: 'text-sm font-medium leading-none',
})``;

export const PrimaryMutted = styled.p.attrs({
  className: 'text-sm text-muted-foreground',
})``;
