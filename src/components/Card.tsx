import { FC, ReactNode } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

interface CardTypes {
  className?: string
  to?: string
  href?: string
  target?: string
  children: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      color: theme.palette.text.primary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      transition: 'transform 0.1s ease-in',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
  })
)

const Card: FC<CardTypes> = ({
  className = '',
  to = '',
  href = '',
  target = '_self',
  children,
}: CardTypes) => {
  const style = useStyles()
  return (
    <NavLink
      to={to}
      href={href}
      target={target}
      rel="noreferrer"
      className={[style.card, className].join('')}
    >
      {children}
    </NavLink>
  )
}

export default Card
