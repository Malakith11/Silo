"use client"

import { useState, useRef, useLayoutEffect } from "react"
import { motion } from "framer-motion"

const features = [
	{
		title: "COMPASS",
		contextText: "Navigate the supplement universe with precision",
		subText: "dosing, clinical insights, and quality all in one place",
		index: "/0.1",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				className="w-10 h-10"
			>
				<circle
					cx="20"
					cy="20"
					r="18"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M20 8 L20 20 L28 28"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		),
		screenshot: "/placeholder.svg?height=40&width=40&text=COMPASS+Interface",
	},
	{
		title: "VANTA Lab",
		contextText: "Build and optimize your stack with AI precision",
		subText: "ultra‑deep protocol lab powered by wearables and tracking",
		index: "/0.2",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				className="w-10 h-10"
			>
				<rect
					x="8"
					y="12"
					width="24"
					height="16"
					rx="2"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M16 20 L20 24 L24 16"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		screenshot: "/placeholder.svg?height=40&width=40&text=VANTA+Lab+Interface",
	},
	{
		title: "LENS",
		contextText: "Shield your decisions with authoritative research",
		subText: "trial data, regulatory insight, and evidence-based protection",
		index: "/0.3",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				className="w-10 h-10"
			>
				<circle
					cx="18"
					cy="18"
					r="10"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="26 26 L32 32"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		),
		screenshot: "/placeholder.svg?height=40&width=40&text=LENS+Analysis+Interface",
	},
	{
		title: "AEGIS",
		contextText: "Expose brand truth with complete transparency",
		subText: "ingredient integrity, sourcing, purity, and testing laid bare",
		index: "/0.4",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				className="w-10 h-10"
			>
				<path
					d="M20 4 L32 12 L32 24 C32 30 20 36 20 36 C20 36 8 30 8 24 L8 12 L20 4 Z"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M16 20 L18 22 L24 16"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		screenshot: "/placeholder.svg?height=40&width=40&text=AEGIS+Shield+Interface",
	},
]

export function SiloCoreFeatures() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const leftColRef = useRef<HTMLDivElement>(null)
	const [leftColHeight, setLeftColHeight] = useState<number>(0)

	// Measure the left column height after render
	useLayoutEffect(() => {
		if (leftColRef.current) {
			setLeftColHeight(leftColRef.current.offsetHeight)
		}
	}, [hoveredIndex])

	return (
		<motion.section
			className="h-screen w-screen flex flex-col justify-center overflow-hidden"
			animate={{
				backgroundColor: hoveredIndex !== null ? "#000000" : "#ffffff",
			}}
			transition={{
				duration: 1.8,
				ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for ultra-smooth transition
			}}
		>
			<div className="max-w-7xl mx-auto w-full px-8 h-full flex items-center relative z-10">
				{/* Left Column - Feature List */}
				<motion.div
					ref={leftColRef}
					className="flex flex-col justify-center min-h-0 w-full relative z-20"
					animate={{
						x: hoveredIndex !== null ? -80 : 0,
					}}
					transition={{ 
						duration: 0.8, 
						ease: [0.23, 1, 0.32, 1],
						type: "spring",
						stiffness: 80,
						damping: 20
					}}
					style={{ height: "auto", maxHeight: "100%" }}
				>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							className="relative py-10 cursor-pointer transition-colors duration-300"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							{/* Animated border divider */}
							{index !== features.length - 1 && (
								<motion.div
									className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"
									initial={{ opacity: 1 }}
									animate={{
										opacity: hoveredIndex !== null ? 0 : 1,
									}}
									transition={{
										duration: 0.8,
										ease: [0.23, 1, 0.32, 1]
									}}
								/>
							)}
							<div className="grid grid-cols-12 items-center gap-8">
								{/* Left Column: Context & Index */}
								<div className="col-span-3">
									<motion.p
										className="text-sm font-normal leading-relaxed mb-1"
										animate={{
											color: hoveredIndex !== null ? "#ffffff" : "#1f2937",
										}}
										transition={{ 
											duration: 0.8, 
											ease: [0.23, 1, 0.32, 1]
										}}
									>
										{feature.contextText}
									</motion.p>
									<motion.p
										className="text-sm font-normal leading-relaxed mb-2"
										animate={{
											color: hoveredIndex !== null ? "#ffffff" : "#4b5563",
										}}
										transition={{ 
											duration: 0.8, 
											ease: [0.23, 1, 0.32, 1]
										}}
									>
										{feature.subText}
									</motion.p>
									<motion.span
										className="text-xs font-mono"
										animate={{
											color: hoveredIndex !== null ? "#9ca3af" : "#9ca3af",
										}}
										transition={{ 
											duration: 0.8, 
											ease: [0.23, 1, 0.32, 1]
										}}
									>
										{feature.index}
									</motion.span>
								</div>

								{/* Center Column: Icon-to-Screenshot Reveal */}
								<div className="col-span-2 flex justify-center">
									<div className="relative w-10 h-10">
										{/* Icon - fades out on hover */}
										<motion.div
											className="absolute inset-0 flex items-center justify-center text-gray-400"
											animate={{
												opacity: hoveredIndex === index ? 0 : 0.15,
												scale: hoveredIndex === index ? 0.95 : 1,
											}}
											transition={{ 
												duration: 0.6, 
												ease: [0.23, 1, 0.32, 1],
												type: "spring",
												stiffness: 100,
												damping: 15
											}}
										>
											{feature.icon}
										</motion.div>

										{/* Screenshot - fades in and scales up on hover */}
										<motion.div
											className="absolute inset-0"
											animate={{
												opacity: hoveredIndex === index ? 1 : 0,
												scale: hoveredIndex === index ? 1.25 : 1.05,
											}}
											transition={{ 
												duration: 0.6, 
												ease: [0.23, 1, 0.32, 1],
												type: "spring",
												stiffness: 100,
												damping: 15
											}}
											style={{ zIndex: 1 }}
										>
											<img
												src={feature.screenshot || "/placeholder.svg"}
												alt={`${feature.title} interface`}
												className="w-10 h-10 object-cover rounded-sm shadow-sm"
											/>
										</motion.div>
									</div>
								</div>

								{/* Right Column: Platform Name */}
								<div className="col-span-7 flex items-center">
									<motion.h3
										className="text-6xl font-semibold tracking-tight leading-tight"
										style={{ fontStretch: "expanded" }}
										animate={{
											x: hoveredIndex === index ? 32 : 0,
											color: hoveredIndex !== null ? "#ffffff" : "#000000",
										}}
										transition={{ 
											duration: 0.8, 
											ease: [0.23, 1, 0.32, 1],
											type: "spring",
											stiffness: 90,
											damping: 18
										}}
									>
										{feature.title}
									</motion.h3>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Right Column - Demo Section */}
				<motion.div
					className="absolute top-1/2 flex items-center justify-center z-30"
					initial={{ opacity: 0, x: 300, scale: 0.2 }}
					animate={{
						opacity: hoveredIndex !== null ? 1 : 0,
						x: hoveredIndex !== null ? 100 : 300,
						scale: hoveredIndex !== null ? 1 : 0.2,
						y: "-50%"
					}}
					transition={{
						duration: 1.0,
						ease: [0.23, 1, 0.32, 1],
						type: "spring",
						stiffness: 60,
						damping: 20,
						scale: { 
							duration: 1.2, 
							delay: 0.1,
							type: "spring",
							stiffness: 80,
							damping: 15
						},
					}}
					style={{
						right: "-100px",
						width: hoveredIndex !== null ? "600px" : "0px",
						height: hoveredIndex !== null ? "500px" : "0px",
					}}
				>
					{hoveredIndex !== null && (
						<motion.div
							className="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
							initial={{ scale: 0.8, opacity: 0, y: 20 }}
							animate={{
								scale: 1,
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 1.0,
								delay: 0.3,
								ease: [0.23, 1, 0.32, 1],
								type: "spring",
								stiffness: 70,
								damping: 18
							}}
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{/* Demo Video/Content */}
							<div
								className="w-full h-full relative bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col"
								style={{ minHeight: 0 }}
							>
								<div className="flex-none text-center text-white w-full pt-10 pb-2">
									<motion.div
										className="text-5xl font-bold mb-4"
										initial={{ y: 30, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ 
											duration: 0.8, 
											delay: 0.4,
											ease: [0.23, 1, 0.32, 1],
											type: "spring",
											stiffness: 80,
											damping: 20
										}}
									>
										{features[hoveredIndex].title}
									</motion.div>
									<motion.div
										className="text-xl text-gray-300 mb-6"
										initial={{ y: 30, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ 
											duration: 0.8, 
											delay: 0.5,
											ease: [0.23, 1, 0.32, 1],
											type: "spring",
											stiffness: 80,
											damping: 20
										}}
									>
										Interactive Demo
									</motion.div>
								</div>
								<motion.div
									className="flex-1 min-h-0 bg-gray-700 rounded-lg flex items-center justify-center"
									initial={{ scale: 0.9, opacity: 0, y: 20 }}
									animate={{ scale: 1, opacity: 1, y: 0 }}
									transition={{ 
										duration: 1.0, 
										delay: 0.6,
										ease: [0.23, 1, 0.32, 1],
										type: "spring",
										stiffness: 70,
										damping: 20
									}}
									style={{
										width: "100%",
										height: "100%",
										maxWidth: "100%",
										minWidth: "0",
									}}
								>
									<div className="text-gray-400 text-lg">
										{features[hoveredIndex].title} Demo
									</div>
								</motion.div>
								<motion.button
									className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-500"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ 
										duration: 0.8, 
										delay: 0.8,
										ease: [0.23, 1, 0.32, 1],
										type: "spring",
										stiffness: 80,
										damping: 20
									}}
								>
									<div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
										<svg
											className="w-8 h-8 text-white ml-1"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</motion.button>
							</div>
						</motion.div>
					)}
				</motion.div>
			</div>
		</motion.section>
	)
}
