export const Player = ({filepath='./Despacito.wav', filename=''}) => {

	let audioInstance = {}

	const audioList1 = [
		{
			name: filename,
			singer: '',
			musicSrc: filepath,
			// support async fetch music src. eg.
			// musicSrc: async () => {
			//   return await fetch('/api')
			// },
		}]

	const options = {
	  // audio lists model
	  audioLists: audioList1,
	  mode: "full",
	  toggleMode: false,
	}

	return (
	  <div>
      </div>
    )}