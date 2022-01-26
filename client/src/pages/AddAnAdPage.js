import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddAnAdPage.module.scss";
import dropdownArrow from "../images/dropdownArrow.png";

const AddAnAdPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			description: "",
			price: "",
		},
	});

	// const { ref, onChange, ...rest } = register("image");
	useEffect(() => {
		register("image");
	}, []);

	const [title, description, img] = watch(["title", "description", "image"]);

	const onSubmit = (data) => {
		console.log(data);
		console.log(img);
	};

	// // Making img upload and preview
	const fileInputRef = useRef();
	const [image, setImage] = useState();
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);

	return (
		<div className={styles["page-wrap"]}>
			<div className={styles.container}>
				<h1>Post new Ad</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Category */}
					<div className={styles["field-base"]}>
						<label htmlFor="categories">Categories:</label>
						<div className={styles["select-wrapper"]}>
							<select
								{...register("category", {
									required: "This field is required",
								})}
								id="categories"
								className={`${styles.select} ${
									errors.category && styles["error-field"]
								}`}
							>
								<option value="">Select category</option>
								<option value="Automotive">Automotive</option>
								<option value="Electronics">Electronics</option>
								<option value="Fashion, Clothing">Fashion, Clothing</option>
								<option value="Floral, Garden">Floral, Garden</option>
								<option value="Food, Drinks">Food, Drinks</option>
								<option value="Health, Beauty">Health, Beauty</option>
								<option value="Home, Decor">Home, Decor</option>
								<option value="Industial, Materials">
									Industial, Materials
								</option>
								<option value="Pets, Animals">Pets, Animals</option>
								<option value="Sports, Outdoors">Sports, Outdoors</option>
								<option value="Toys, Games">Toys, Games</option>
								<option value="Others">Others</option>
							</select>
							{/* Error handling message: */}
							<div>
								{errors.category && (
									<span className={styles["error-text"]}>
										{errors.category.message}
									</span>
								)}
							</div>
						</div>
					</div>
					{/* Title */}
					<div className={styles["field-base"]}>
						<label htmlFor="title">Ad title:</label>
						<div className={styles["input-wrapper"]}>
							<input
								{...register("title", {
									required: "This field is required",
									minLength: {
										value: 2,
										message: "Title is too short",
									},
								})}
								className={`${styles.input} ${
									errors.title && styles["error-field"]
								}`}
								type="text"
								placeholder="Type here.."
								maxLength={100}
							/>
							{/* Error handling message: */}
							<div>
								{errors.title && (
									<span className={styles["error-text"]}>
										{errors.title.message}
									</span>
								)}
							</div>
						</div>
						<span className={styles.remaining}>
							{100 - title.length} characters remaining
						</span>
					</div>
					{/* Description */}
					<div className={styles["field-base"]}>
						<label htmlFor="description">Description:</label>
						<div className={styles["input-wrapper"]}>
							<textarea
								{...register("description", {
									required: "This field is required",
									minLength: {
										value: 2,
										message: "Title is too short",
									},
								})}
								className={`${styles.textarea} ${
									errors.description && styles["error-field"]
								}`}
								placeholder="Type here.."
								maxLength={1000}
							/>
							<div>
								{errors.description && (
									<span className={styles["error-text"]}>
										{errors.description.message}
									</span>
								)}
							</div>
						</div>
						<span className={styles.remaining}>
							{1000 - description.length} characters remaining
						</span>
					</div>
					{/* Price */}
					<div className={styles["field-base"]}>
						<label htmlFor="price">Price:</label>
						<div>
							<div className={styles["price-wrap"]}>
								<input
									type="number"
									placeholder="0"
									{...register("price", {
										required: "This field is required",
									})}
									className={`${styles.input} ${
										errors.price && styles["error-field"]
									}`}
								/>
							</div>
							<div>
								{errors.price && (
									<span className={styles["error-text"]}>
										{errors.price.message}
									</span>
								)}
							</div>
						</div>
					</div>
					{/* Image */}
					<div className={styles["field-base"]}>
						<label htmlFor="image">Image:</label>
						<div>
							<input
								style={{ display: "none" }}
								type="file"
								accept="image/*"
								ref={fileInputRef}
								onChange={(e) => {
									setValue("image", e.target.files);
									const file = e.target.files[0];
									if (file) {
										setImage(file);
									} else {
										setImage(null);
									}
								}}
							/>

							<button
								className={styles["upload-btn"]}
								onClick={(e) => {
									e.preventDefault();
									fileInputRef.current.click();
								}}
							>
								<div className={styles["upload-btn-box"]}>Upload..</div>
							</button>
						</div>
						{preview ? (
							<div className={styles.preview}>
								<img src={preview} alt="Uploaded preview" />
								<button
									className={styles["del-btn"]}
									onClick={(e) => {
										e.preventDefault();
										setImage(null);
										setValue("image", null);
									}}
								>
									Delete
								</button>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<input type="submit" />
				</form>
			</div>
		</div>
	);
};

export default AddAnAdPage;
