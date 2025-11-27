import { Material } from '@/app/types/Material';
import { gruopedPieces, Piece } from '@/app/types/Piece';
import React from 'react';
import GroupedPiecesTables from '../../components/GroupedPiecesTables';
import PiecesForm from '@/app/components/forms/PiecesForm';
import { useAppDispatch } from '@/app/hooks/useRedux';
import { addPiece } from '@/app/store/slices/piecesSlice';

type Props = {
  pieces: gruopedPieces[];
  materials: Material[];
};

export default function Pieces({ pieces, materials }: Props) {
  const dispatch = useAppDispatch();

  const handleOnsubmit = (piece: Piece) => {
    dispatch(addPiece(piece));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Panel izquierdo: Formulario */}
      <section className="w-full md:w-1/3 bg-white rounded-xl shadow-md p-5 flex flex-col">
        {materials.length > 0 ? (
          <PiecesForm materials={materials} onSubmit={handleOnsubmit} />
        ) : (
          <p className="text-sm text-gray-500 text-center italic mt-4">
            No hay materiales disponibles.
          </p>
        )}
      </section>

      {/* Panel derecho: Tabla */}
      <section className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-5 overflow-y-auto max-h-[85vh]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tabla de Piezas
        </h3>
        <GroupedPiecesTables groupedData={pieces} />
      </section>
    </div>
  );
}
