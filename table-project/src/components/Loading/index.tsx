
const Loading = () => {
    return (
        <div className="absolute flex w-full h-full bg-gray-300/50 items-center justify-center">
            <div className="animate-spin w-[4rem] h-[4rem]  rounded-full border-[.5rem] border-white border-b-orange-400 border-t-orange-400" />
        </div>
    )
}

export default Loading