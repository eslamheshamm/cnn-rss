import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [photos, setPhotos] = useState([]);
	const [start, setStart] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);

		axios
			.get(
				`http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=7`
			)
			.then((response) => {
				setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("There was an error!", error);
				setIsLoading(false);
			});
	}, [start]);

	const handleLoadMore = () => {
		setStart((prevStart) => prevStart + 5);
	};

	return (
		<main className="w-11/12 lg:w-10/12 mx-auto py-10 lg:p-20">
			<h2 className="text-xl lg:text-2xl font-bold mb-10">
				CNN.com - RSS Channel - App International Edition
			</h2>
			{photos && photos.length > 0 && (
				<section className=" flex flex-col justify-center items-center gap-16">
					<ul className=" grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 w-full h-full grid-flow-row">
						{photos.map((photo, index) => (
							<li
								key={index++}
								className={`relative w-full h-full max-h-80 ${
									index === 0 && "col-span-2"
								} ${index === 6 && "lg:col-span-2"}`}
							>
								<img
									className="w-full h-full object-cover"
									src={photo.thumbnailUrl}
									alt={photo.title}
								/>
								<h3 className=" absolute text-xs bottom-4 lg:text-base  lg:bottom-10 px-4">
									{photo.title}
								</h3>
							</li>
						))}
					</ul>
					<button
						className=" border-2 border-black font-bold px-8 py-3 "
						onClick={handleLoadMore}
					>
						{isLoading ? "Loading" : "View More"}
					</button>
				</section>
			)}
		</main>
	);
}

export default App;
