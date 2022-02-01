import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import styles from "./CategoryPage.module.scss";
import { useContextBM } from "../context/Context";
import BizMarketApi from "../api/BizMarketApi";
import AdCard from "../components/AdCard";

const CategoryPage = () => {
	const { categoryId } = useParams();
	// const location = useLocation();
	// const { category } = location.state;
	// console.log(category);

	const { categories, currentCategory, setCurrentCategory } = useContextBM();
	if (categories.length > 0) {
		console.log(categories);
		const category = categories.filter(
			(category) => category.id === +categoryId
		)[0];

		setCurrentCategory(category);
		console.log(currentCategory);
	}

	const [sortWay, setSortWay] = useState("most popular");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await BizMarketApi.get("/search", {
					params: {
						categoryId: 2,
						searchTerm: "iphone",
					},
				});
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			{/* <Breadcrumbs /> */}
			<div className={styles.inner}>
				<div className={styles.filters}></div>
				{currentCategory ? (
					<div className={styles.content}>
						<div className={styles["top-bar"]}>
							<h1 className={styles.h1}>
								Most recent ads in category {currentCategory.name}
							</h1>
							<div className={styles["sort-wrap"]}>
								<span>Sort by: </span>
								<span>{sortWay}</span>
							</div>
						</div>
						<div className={styles.ads}>
							<AdCard />
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
