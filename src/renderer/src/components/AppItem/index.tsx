import './AppItem.scss'

interface AppItemProps {
    selected: boolean
    image: {
        id: string
        image?: string
    }
}

export default function AppItem({ selected, image }: AppItemProps): JSX.Element {
    return (
        <div 
            className={`app-item-inner ${selected ? 'selected' : ''}`}
            tabIndex={0}
        >
          <img
            src={image.image ? image.image : '/default.png'}
            alt="App"
            className={selected ? 'selected' : ''}
          />
        </div>
    )
}