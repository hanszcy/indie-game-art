# From direction to playable artwork

## The production contract

Before an asset batch, pin one real gameplay camera and the smallest shipped display size. Record the actor's approximate pixel height, ground contact, light direction, meaningful occlusion, HUD area and the busiest playable arrangement. The asset batch must solve this scene, not a promotional crop.

For a substantial redesign, the minimal useful set is often one background or floor, one actor, one interactable, one obstacle, and one state change. It is not a universal required list. For a word game, type and selection may be the entire set.

## Asset briefs that survive integration

Specify the asset's role, world, medium, camera, lighting, footprint, anchor, padding, transparency and state variants. Differentiate concept compositions from production images. A composition can include scenery and atmosphere; an actor sprite needs clean independent edges. A tile needs seamless or deliberately jointed edges. A sheet needs fixed cell dimensions, isolated subjects and an ordering manifest.

Inspect generated results before coding against guessed coordinates. Verify actual dimensions and alpha. If a sheet's cells drift, adjust source rectangles or regenerate; do not keep cropped feet or baked checkerboards. Store the reusable source and prompt with the project. Use local assets for shipping and document third-party licenses. A photograph or generated illustration of UI is not a substitute for functional controls.

Keep a background's highest contrast away from the legal-action field. Avoid the common failure where rich scenery ends at a conspicuous rectangular gray board, or a tiny geometric actor floats over a painted world. The foreground needs the same camera, contact, lighting and level of craft.

## Make state visible through material

Choose one material-specific behavior and carry it through:

- Parcel / stone / machinery: contact, resistance, displacement, then a stable landing. Do not stretch every object like jelly.
- Brittle / soft / liquid collectibles: different break, squeeze or flow. Keep category identity readable at the smallest size.
- Snow / air / water motion: footing, edge contact, trail and recovery should explain speed and weight. A moving background alone does not give the actor movement.

These are starting questions, not mandatory themes or effects. A deliberately abstract treatment may express the same relationships by line tension, spacing or rhythm.

## Capture gates

Before expanding: view a representative gameplay screenshot, then inspect input, peak contact and resting frames. Check the actor, interactable and ground together, including partial occlusion. Test rapid repetition and a rejected action. On mobile, verify board aspect ratio and actual target size, not only “no horizontal overflow”.

Before handoff: inspect busiest gameplay, recovery and completion at minimum and typical viewports. Record a real limitation if one remains. Do not hide low-quality foreground assets behind a title screen, static concept, cinematic border, blur or particles.
