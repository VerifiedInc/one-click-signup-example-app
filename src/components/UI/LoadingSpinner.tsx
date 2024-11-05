import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: 20,
          height: 20,
          backgroundColor: '#007bff',
          borderRadius: '50%',
          margin: '0 5px',
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
