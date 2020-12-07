import React, { useState } from "react";
import { Stage, Layer, Text, Image, Group, Rect } from "react-konva";
import useImage from "use-image";
import { StorableLayerType } from "@bridged.xyz/client-sdk/lib";
import { CGRectManifest, TextManifest } from "@reflect.bridged.xyz/core/lib";
import { currentTextEditValueAtom, editorState } from "../../states/text-editor.state";
import { targetLayerIdAtom } from "../../states/preview-canvas.state"
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState } from "recoil";
import { SelectableLayer } from "../../components/canvas/selectable-layer";
import { SceneLocalRepository } from "../../repositories";
import { convertReflectColorToUniversal } from "@reflect.bridged.xyz/core/lib/converters/color.convert"
import { ColorFormat } from "@reflect.bridged.xyz/core/lib/color";

export default function (props: {
    sceneRepository?: SceneLocalRepository
}) {
    const { sceneRepository } = props
    const scene = sceneRepository?.scene;
    const [isSelect, setIsSelect] = useRecoilState(editorState);
    const [targetLayerId, setTargetLayerId] = useRecoilState(targetLayerIdAtom);
    const [selectionLayerId, setSelectionLayerId] = useState<string>();

    // https://github.com/konvajs/react-konva/issues/533
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

    if (scene && typeof window !== "undefined") {
        console.log('sceneRepository', sceneRepository)
        console.log('layers', scene.layers)
        return (
            <div
                style={{
                    backgroundColor: "#FFFFFF"
                }}>
                <Stage
                    width={scene.width}
                    height={scene.height}
                    onClick={(e) => {
                        const targetId = e.target.attrs.id;
                        setTargetLayerId(targetId)

                        /**
                         * since the stage gets click event callback,
                         * no regarding to its' child also have click event being called,
                         * we should check the event id,
                         * and compare to actual selection event comming from the layer itself.
                         */
                        if (selectionLayerId !== targetId) {
                            setSelectionLayerId(targetId)
                            setIsSelect(false);
                        }
                    }}
                >
                    <RecoilBridge>
                        <Layer key="main-layer">
                            {scene.layers
                                .sort((a, b) => a.index - b.index)
                                .map((e) => {
                                    console.log(e)
                                    if (e.type == StorableLayerType.text) {
                                        console.log('text layer', e)
                                        return (
                                            <Group key={e.nodeId} x={e.x} y={e.y}>
                                                <EditableG11nText
                                                    key={e.nodeId}
                                                    id={e.nodeId}
                                                    selected={selectionLayerId === e.nodeId}
                                                    manifest={e.data as TextManifest}
                                                    width={e.width}
                                                    height={e.height}
                                                    onFocusChange={(
                                                        id: string,
                                                        focus: boolean
                                                    ) => {
                                                        console.log('focus change', id)
                                                        if (focus) {
                                                            setSelectionLayerId(id)
                                                            setIsSelect(true);
                                                        }
                                                    }}
                                                />
                                            </Group>
                                        );
                                    } else if (e.type == StorableLayerType.vanilla) {
                                        return (
                                            <Group key={e.nodeId} x={e.x} y={e.y}>
                                                <StaticDesignImageDisplay
                                                    url={(e.data as any)?.src}
                                                    width={e.width}
                                                    height={e.height}
                                                />
                                            </Group>
                                        );
                                    } else if (e.type == StorableLayerType.rect) {
                                        return (
                                            <CGRect
                                                key={e.nodeId} data={e.data as CGRectManifest}
                                            />
                                        );
                                    }
                                })}
                        </Layer>
                    </RecoilBridge>
                </Stage>
            </div>
        );
    } else {
        return <p>loading..</p>;
    }
}

function CGRect(props: {
    data: CGRectManifest
}) {
    const fill = props.data.fill !== undefined ? convertReflectColorToUniversal(props.data.fill, ColorFormat.hex6) : undefined
    console.log('data', props.data)
    console.log('fill', fill)
    return (
        // <SelectableLayer>
        <Rect
            opacit={1}
            fill={fill}
            width={props.data.width}
            height={props.data.height}
        />
        // </SelectableLayer>
    )
}

function StaticDesignImageDisplay(props: {
    url: string;
    width: number;
    height: number;
    x?: number;
    y?: number;
}) {
    const [image] = useImage(props.url);
    return (
        <SelectableLayer {...props}>
            <Image
                image={image}
                width={props.width}
                height={props.height}
                x={props.x}
                y={props.y}
            />
        </SelectableLayer>

    );
};


function EditableG11nText(props: {
    id: string;
    selected: boolean;
    manifest: TextManifest;
    width: number;
    height: number;
    onFocusChange: (id: string, focus: boolean) => void;
}) {
    console.log('props', props)

    let text = props.manifest.text
    if (props.selected) {
        const [currentEditTextValue, setCurrentEditTextValue] = useRecoilState(currentTextEditValueAtom)
        text = currentEditTextValue ?? ""
    }

    return (
        <SelectableLayer {...props}>
            <Text
                key={props.id}
                id={props.id}
                text={text}
                align={props.manifest.textAlign}
                verticalAlign={props.manifest.textAlignVertical}
                fontSize={props.manifest.style.fontSize}
                // TODO implement font loading
                fontFamily="'Arial'" //{`"${props.text.style.fontFamily}"`}
                width={props.width}
                height={props.height}
            />
        </SelectableLayer>
    );
}
