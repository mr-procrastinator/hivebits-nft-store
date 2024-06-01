import './style.scss'

export interface IPageHeaderProps {
  image?: string
}

export const PageHeading: React.FC<IPageHeaderProps> = ({ image }) => {
  return <div className="page-header">
    <div className="page-header__wrapper">
      <div 
        className="page-header__image"
        style={{ backgroundImage: image ? `url(${image})` : ''}}
      ></div>
    </div>
  </div>
}
