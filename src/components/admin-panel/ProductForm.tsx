"use client";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    axios
      .post("/api/add_product", payload)
      .then((res) => {
        makeToast("Product added Successfully");
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc ? payload.imgSrc : "/placeholder.jpg"}
        width={800}
        height={500}
        alt="product_image"
      />

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log(res);

          setPayload({
            ...payload,
            imgSrc: res[0]?.url,
            fileKey: res[0]?.key,
          });
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error}`);
        }}
      />

      <div>
        <label className="block ml-1">Product Name</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block ml-1">Product Category</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block ml-1">Product price</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end">
        <button className="bg-green-500 text-white px-8 py-2 rounded-md">
          Add
        </button>
      </div>
    </form>
  );
};

export default ProductForm;