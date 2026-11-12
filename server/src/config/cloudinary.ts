// cloudinary.ts
// Product photo lives on a cloudinary, a service that stores pictures and serves them quickly from anywhere in the World, This file logs in to cloudinary once and has small helpers for photo address

import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

// Every product photo is kept in the "quickcart/products" folder
// quickcart.products/smart-watch-ultra

export const PHOTO_FOLDER = "quickcart/products";
export const UPLOAD_FOLDER = `${PHOTO_FOLDER}/uploads`;

// store products photos on Cloudinary
// Log into cloudinary with the 3 settings from .env, and build photo address. f_auto q_auto in an address ask cloudinary for the best format and size for each browser, so photos loads faster

export const isCloudinaryReady = Boolean(
  env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret,
);

// What to do when the cloudinary settings are  missing
export const CLOUDINARY_MISSING =
  "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ans CLOUDINARY_API_SECRET to server/.env.";

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure: true, // https address
});

// the start of every photo address . e.g "http://res.cloudinary.com/my-cloud/images/upload/f_auto, q_auto/"

const PHOTO_URL_START = `https://res.cloudinary.com/${env.cloudinaryCloudName}/image/upload/f_auto,q_auto/`;

// "quickcart/ product/ smart-watch-ultra" -> "https://res.cloudinary.com/my-cloud/image/upload/f_auto, q_auto/quickcart/products/smart-watch-ultra"

export const photoUrl = (publicId: string) => {
  return PHOTO_URL_START + publicId;
};

// The photo of a demo product , from it slug: "smart-watch-ultra" -> its cloudinary address

export const productPhotoUrl = (slug: string) => {
  return photoUrl(`${PHOTO_FOLDER}/${slug}`);
};

// is this one of our product photos (an address in our cloudinary folder, nothing else)

export const isOurPhoto = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + PHOTO_FOLDER + "/")
  ) {
    return false;
  }

  return /^[\w/-]+$/.test(url.slice(PHOTO_URL_START.length));
};

// The cloudinary name (public id) of a photo admin uploads, or null for any other photo.

// Demo photo are never deleted from admin; npm run upload-images put them there.

export const uploadedPhotoId = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + UPLOAD_FOLDER + "/")
  ) {
    return null;
  }
  return url.slice(PHOTO_URL_START.length);
};

// Sends a photo (the file's bytes) to cloudinary amd return its public id
export const UploadPhoto = (bytes: Buffer, publicId: string) => {
  return new Promise<string>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { public_id: publicId, overwrite: true, resource_type: "image" },
      (error, result) => {
        return error || !result
          ? reject(error ?? new Error("Cloudinary didnt Answer"))
          : resolve(result.public_id);
      },
    );
    upload.end(bytes);
  });
};

// Deletes on photo from cloudinary (a missing photo is not an error)
export const deletePhoto = async (publicId: string) => {
  await cloudinary.uploader
    .destroy(publicId, { invalidate: true })
    .catch(() => {});
};

// Delete every photo admins uploads (the demo panels "reset demo data" does this)
export const deleteAllUploadedPhotos = async () => {
  if (!isCloudinaryReady) {
    return;
  }
  await cloudinary.api
    .delete_resources_by_prefix(`${UPLOAD_FOLDER}/`)
    .catch(() => {});
};

// List the names (public ids) of all demo product photo on cloudinary,
// e.g ["quickcart/product/smart-watch-ultra-1", ... ] .admin uploads are left out.
// cloudinary sends at most 500 per page, so we keep asking for the next page untill there is none.
// empty list when cloudinary isnt set up (the products are then saved without photos)

export const listProductionPhotoIds = async (): Promise<string[]> => {
  if (!isCloudinaryReady) {
    return [];
  }

  const ids: string[] = [];
  let nextCursor: string | undefined = undefined;

  do {
    const page = await cloudinary.api.resources({
      type: "upload",
      prefix: `${PHOTO_FOLDER}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const photo of page.resources ?? []) {
      ids.push(photo.public_id);
    }

    nextCursor = page.next_cursor; // undefined on the list page, which ends the loop
  } while (nextCursor);

  return ids.filter((id) => {
    return !id.startsWith(`${UPLOAD_FOLDER}/`);
  });
};
