import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
const Icon = ({ name, type, color, size }: { name: any, type: any, color: any, size: any }) => {
    return (
        <FontAwesome6 name={name} iconStyle={type} color={color} size={size} />
    )
}

export default Icon